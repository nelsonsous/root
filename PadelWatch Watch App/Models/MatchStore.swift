import Foundation
import Combine

class MatchStore: ObservableObject {
    @Published var currentMatch: Match?
    @Published var history: [Match] = []

    private let saveKey = "PadelMatchStoreV1"

    init() { load() }

    func startNewMatch(teamAName: String, teamBName: String, format: MatchFormat, goldenPoint: Bool) {
        currentMatch = Match(
            teamAName: teamAName.isEmpty ? "Equipa A" : teamAName,
            teamBName: teamBName.isEmpty ? "Equipa B" : teamBName,
            format: format,
            useGoldenPoint: goldenPoint
        )
        save()
    }

    func archiveCurrentMatch() {
        if let match = currentMatch {
            history.insert(match, at: 0)
            if history.count > 20 { history = Array(history.prefix(20)) }
        }
        currentMatch = nil
        save()
    }

    func discardCurrentMatch() {
        currentMatch = nil
        save()
    }

    func save() {
        let model = StorageModel(current: currentMatch, history: history)
        if let data = try? JSONEncoder().encode(model) {
            UserDefaults.standard.set(data, forKey: saveKey)
        }
    }

    private func load() {
        guard
            let data = UserDefaults.standard.data(forKey: saveKey),
            let model = try? JSONDecoder().decode(StorageModel.self, from: data)
        else { return }
        currentMatch = model.current
        history = model.history
    }

    private struct StorageModel: Codable {
        var current: Match?
        var history: [Match]
    }
}
