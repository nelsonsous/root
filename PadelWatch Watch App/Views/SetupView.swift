import SwiftUI

struct SetupView: View {
    @EnvironmentObject var store: MatchStore

    @State private var teamAName = ""
    @State private var teamBName = ""
    @State private var format: MatchFormat = .bestOf3
    @State private var goldenPoint = false

    var body: some View {
        NavigationStack {
            List {
                Section("Equipas") {
                    TextField("Equipa A", text: $teamAName)
                    TextField("Equipa B", text: $teamBName)
                }

                Section("Formato") {
                    Picker("Jogo", selection: $format) {
                        ForEach(MatchFormat.allCases) { fmt in
                            Text(fmt.rawValue).tag(fmt)
                        }
                    }
                    .pickerStyle(.navigationLink)
                }

                Section("Regras") {
                    Toggle("Golden Point", isOn: $goldenPoint)
                }

                Section {
                    Button {
                        store.startNewMatch(
                            teamAName: teamAName,
                            teamBName: teamBName,
                            format: format,
                            goldenPoint: goldenPoint
                        )
                    } label: {
                        Label("Iniciar Jogo", systemImage: "play.fill")
                            .frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(.green)
                    .listRowBackground(Color.clear)
                }

                if !store.history.isEmpty {
                    Section("Histórico") {
                        ForEach(store.history) { match in
                            HistoryRow(match: match)
                        }
                    }
                }
            }
            .navigationTitle("Padel")
        }
    }
}

private struct HistoryRow: View {
    let match: Match

    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            HStack {
                Text(match.teamAName)
                    .font(.caption2)
                    .foregroundStyle(.blue)
                Spacer()
                Text(match.teamBName)
                    .font(.caption2)
                    .foregroundStyle(.red)
            }
            HStack {
                Text("\(match.setsWonByA)")
                    .font(.caption.bold())
                    .foregroundStyle(.blue)
                ForEach(match.sets) { set in
                    Text("\(set.gamesA)-\(set.gamesB)")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                Text("\(match.setsWonByB)")
                    .font(.caption.bold())
                    .foregroundStyle(.red)
            }
        }
        .padding(.vertical, 2)
    }
}
