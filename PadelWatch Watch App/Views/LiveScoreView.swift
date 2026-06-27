import SwiftUI
import WatchKit

struct LiveScoreView: View {
    @EnvironmentObject var store: MatchStore
    @ObservedObject var match: Match

    @State private var timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()
    @State private var tick = 0

    var body: some View {
        if match.isFinished {
            MatchEndView(match: match)
        } else {
            scoreUI
        }
    }

    private var scoreUI: some View {
        VStack(spacing: 4) {
            ScoreBoard(match: match)

            HStack(spacing: 6) {
                PointButton(label: shortName(match.teamAName), color: .blue) {
                    scorePoint(.a)
                }
                PointButton(label: shortName(match.teamBName), color: .red) {
                    scorePoint(.b)
                }
            }

            HStack {
                Button {
                    match.undoLastPoint()
                    store.save()
                    WKInterfaceDevice.current().play(.retry)
                } label: {
                    Image(systemName: "arrow.uturn.backward.circle")
                        .font(.caption)
                        .foregroundStyle(match.canUndo ? .yellow : .secondary)
                }
                .buttonStyle(.borderless)
                .disabled(!match.canUndo)

                Spacer()

                Text(match.durationString)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                    .monospacedDigit()
                    .onReceive(timer) { _ in tick += 1 }
            }
            .padding(.horizontal, 4)
        }
        .padding(.horizontal, 4)
        .padding(.top, 2)
    }

    private func scorePoint(_ team: Team) {
        match.awardPoint(to: team)
        store.save()
        WKInterfaceDevice.current().play(match.isFinished ? .notification : .success)
    }

    private func shortName(_ s: String) -> String {
        s.split(separator: " ").first.map { String($0.prefix(5)) } ?? String(s.prefix(5))
    }
}

// MARK: - ScoreBoard

struct ScoreBoard: View {
    @ObservedObject var match: Match

    var body: some View {
        VStack(spacing: 3) {
            teamNamesRow
            Divider()
            currentScoreRow
        }
    }

    private var teamNamesRow: some View {
        HStack(alignment: .top) {
            VStack(alignment: .leading, spacing: 0) {
                Text(match.teamAName)
                    .font(.caption2)
                    .foregroundStyle(.blue)
                    .lineLimit(1)
                Text("\(match.setsWonByA)")
                    .font(.title3.bold())
                    .foregroundStyle(.blue)
            }

            Spacer()

            completedSetsView

            Spacer()

            VStack(alignment: .trailing, spacing: 0) {
                Text(match.teamBName)
                    .font(.caption2)
                    .foregroundStyle(.red)
                    .lineLimit(1)
                Text("\(match.setsWonByB)")
                    .font(.title3.bold())
                    .foregroundStyle(.red)
            }
        }
    }

    @ViewBuilder
    private var completedSetsView: some View {
        let completed = match.sets.dropLast()
        if !completed.isEmpty {
            VStack(spacing: 1) {
                ForEach(completed) { set in
                    Text("\(set.gamesA)-\(set.gamesB)")
                        .font(.system(size: 9))
                        .foregroundStyle(.secondary)
                }
            }
        }
    }

    @ViewBuilder
    private var currentScoreRow: some View {
        if match.isCurrentSetSuperTiebreak {
            HStack(spacing: 8) {
                Text("\(match.currentSet.gamesA)")
                    .font(.title2.bold())
                    .foregroundStyle(.blue)
                VStack(spacing: 0) {
                    Text("Super")
                    Text("TB")
                }
                .font(.system(size: 9))
                .foregroundStyle(.yellow)
                Text("\(match.currentSet.gamesB)")
                    .font(.title2.bold())
                    .foregroundStyle(.red)
            }
        } else {
            HStack(spacing: 6) {
                VStack(spacing: 1) {
                    Text("\(match.currentSet.gamesA)")
                        .font(.title3.bold())
                        .foregroundStyle(.blue)
                    Text("\(match.currentSet.gamesB)")
                        .font(.title3.bold())
                        .foregroundStyle(.red)
                }

                VStack(spacing: 1) {
                    Text(match.currentSet.isInTiebreak ? "TB" : "jg")
                        .font(.system(size: 9))
                        .foregroundStyle(match.currentSet.isInTiebreak ? .yellow : .secondary)
                    Text("pt")
                        .font(.system(size: 9))
                        .foregroundStyle(.secondary)
                }

                VStack(spacing: 1) {
                    pointText(match.currentGame.display(for: .a), color: .blue)
                    pointText(match.currentGame.display(for: .b), color: .red)
                }
            }

            if match.currentGame.isDeuce {
                Text("DEUCE")
                    .font(.system(size: 9, weight: .bold))
                    .foregroundStyle(.yellow)
            }
        }
    }

    private func pointText(_ s: String, color: Color) -> some View {
        Text(s.isEmpty ? "-" : s)
            .font(.title3.bold())
            .foregroundStyle(color)
    }
}

// MARK: - PointButton

struct PointButton: View {
    let label: String
    let color: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(label)
                .font(.headline)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)
        }
        .buttonStyle(.bordered)
        .tint(color)
    }
}
