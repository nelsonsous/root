import SwiftUI
import WatchKit

struct MatchEndView: View {
    @EnvironmentObject var store: MatchStore
    let match: Match

    var body: some View {
        ScrollView {
            VStack(spacing: 8) {
                if let winner = match.matchWinner {
                    Image(systemName: "trophy.fill")
                        .font(.title2)
                        .foregroundStyle(.yellow)

                    Text(match.name(for: winner))
                        .font(.headline)
                        .multilineTextAlignment(.center)
                        .foregroundStyle(winner == .a ? .blue : .red)

                    Text("Ganhou!")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }

                Divider()

                setsResultView

                Divider()

                HStack(spacing: 4) {
                    Image(systemName: "clock")
                        .font(.caption2)
                    Text(match.durationString)
                        .font(.caption2)
                }
                .foregroundStyle(.secondary)

                HStack(spacing: 8) {
                    Button {
                        WKInterfaceDevice.current().play(.click)
                        store.archiveCurrentMatch()
                    } label: {
                        Label("Novo", systemImage: "plus")
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(.green)
                }
            }
            .padding(.horizontal, 4)
        }
        .onAppear {
            WKInterfaceDevice.current().play(.success)
        }
    }

    private var setsResultView: some View {
        VStack(spacing: 4) {
            ForEach(Array(match.sets.enumerated()), id: \.offset) { idx, set in
                HStack {
                    Text("\(set.gamesA)")
                        .font(.title3.bold())
                        .foregroundStyle(set.winner == .a ? .blue : .primary)
                    Text("Set \(idx + 1)\(set.isSuperTiebreak ? "*" : "")")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                        .frame(minWidth: 36)
                    Text("\(set.gamesB)")
                        .font(.title3.bold())
                        .foregroundStyle(set.winner == .b ? .red : .primary)
                }
            }
            if match.sets.contains(where: { $0.isSuperTiebreak }) {
                Text("* Super Tiebreak")
                    .font(.system(size: 8))
                    .foregroundStyle(.secondary)
            }
        }
    }
}
