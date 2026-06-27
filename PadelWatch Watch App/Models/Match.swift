import Foundation
import Combine

class Match: ObservableObject, Identifiable, Codable {

    enum CodingKeys: String, CodingKey {
        case id, teamAName, teamBName, format, useGoldenPoint
        case sets, currentGame, isFinished, startTime, endTime
    }

    let id: UUID
    let teamAName: String
    let teamBName: String
    let format: MatchFormat
    let useGoldenPoint: Bool

    @Published private(set) var sets: [SetScore]
    @Published private(set) var currentGame: GameScore
    @Published private(set) var isFinished: Bool
    let startTime: Date
    private(set) var endTime: Date?

    private var stateHistory: [MatchState] = []

    init(
        teamAName: String = "Equipa A",
        teamBName: String = "Equipa B",
        format: MatchFormat = .bestOf3,
        useGoldenPoint: Bool = false
    ) {
        self.id = UUID()
        self.teamAName = teamAName
        self.teamBName = teamBName
        self.format = format
        self.useGoldenPoint = useGoldenPoint
        self.startTime = Date()
        _sets = Published(wrappedValue: [SetScore()])
        _currentGame = Published(wrappedValue: GameScore(isGoldenPoint: useGoldenPoint))
        _isFinished = Published(wrappedValue: false)
    }

    required init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id = try c.decode(UUID.self, forKey: .id)
        teamAName = try c.decode(String.self, forKey: .teamAName)
        teamBName = try c.decode(String.self, forKey: .teamBName)
        format = try c.decode(MatchFormat.self, forKey: .format)
        useGoldenPoint = try c.decode(Bool.self, forKey: .useGoldenPoint)
        startTime = try c.decode(Date.self, forKey: .startTime)
        endTime = try c.decodeIfPresent(Date.self, forKey: .endTime)
        _sets = Published(wrappedValue: try c.decode([SetScore].self, forKey: .sets))
        _currentGame = Published(wrappedValue: try c.decode(GameScore.self, forKey: .currentGame))
        _isFinished = Published(wrappedValue: try c.decode(Bool.self, forKey: .isFinished))
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: CodingKeys.self)
        try c.encode(id, forKey: .id)
        try c.encode(teamAName, forKey: .teamAName)
        try c.encode(teamBName, forKey: .teamBName)
        try c.encode(format, forKey: .format)
        try c.encode(useGoldenPoint, forKey: .useGoldenPoint)
        try c.encode(sets, forKey: .sets)
        try c.encode(currentGame, forKey: .currentGame)
        try c.encode(isFinished, forKey: .isFinished)
        try c.encode(startTime, forKey: .startTime)
        try c.encodeIfPresent(endTime, forKey: .endTime)
    }

    // MARK: - Computed

    var setsWonByA: Int { sets.filter { $0.winner == .a }.count }
    var setsWonByB: Int { sets.filter { $0.winner == .b }.count }

    var currentSet: SetScore { sets.last ?? SetScore() }

    var matchWinner: Team? {
        if setsWonByA >= format.setsToWin { return .a }
        if setsWonByB >= format.setsToWin { return .b }
        return nil
    }

    var isCurrentSetSuperTiebreak: Bool { currentSet.isSuperTiebreak }

    var canUndo: Bool { !stateHistory.isEmpty }

    func name(for team: Team) -> String { team == .a ? teamAName : teamBName }

    var duration: TimeInterval { (endTime ?? Date()).timeIntervalSince(startTime) }

    var durationString: String {
        let t = Int(duration)
        let h = t / 3600
        let m = (t % 3600) / 60
        let s = t % 60
        return h > 0 ? String(format: "%d:%02d:%02d", h, m, s) : String(format: "%02d:%02d", m, s)
    }

    // MARK: - Actions

    func awardPoint(to team: Team) {
        guard !isFinished else { return }
        stateHistory.append(MatchState(sets: sets, currentGame: currentGame))

        if isCurrentSetSuperTiebreak {
            var updated = sets[sets.count - 1]
            if team == .a { updated.gamesA += 1 } else { updated.gamesB += 1 }
            sets[sets.count - 1] = updated
            checkSetAndMatchWinner()
        } else {
            var game = currentGame
            if team == .a { game.pointsA += 1 } else { game.pointsB += 1 }
            currentGame = game

            if let gameWinner = currentGame.winner {
                awardGame(to: gameWinner)
            }
        }
    }

    func undoLastPoint() {
        guard let state = stateHistory.popLast() else { return }
        sets = state.sets
        currentGame = state.currentGame
        isFinished = false
        endTime = nil
    }

    // MARK: - Private

    private func awardGame(to team: Team) {
        var updated = sets[sets.count - 1]
        if team == .a { updated.gamesA += 1 } else { updated.gamesB += 1 }
        sets[sets.count - 1] = updated

        checkSetAndMatchWinner()

        if !isFinished {
            let inTiebreak = sets.last?.isInTiebreak ?? false
            currentGame = GameScore(
                isTiebreak: inTiebreak,
                isGoldenPoint: !inTiebreak && useGoldenPoint
            )
        }
    }

    private func checkSetAndMatchWinner() {
        guard currentSet.winner != nil else { return }

        if matchWinner != nil {
            isFinished = true
            endTime = Date()
            return
        }

        let needsSuperTiebreak = format == .bestOf3 && setsWonByA == 1 && setsWonByB == 1
        sets.append(SetScore(isSuperTiebreak: needsSuperTiebreak))

        if !needsSuperTiebreak {
            currentGame = GameScore(isGoldenPoint: useGoldenPoint)
        }
    }
}
