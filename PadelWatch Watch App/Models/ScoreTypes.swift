import Foundation

enum Team: String, CaseIterable, Identifiable, Codable {
    case a = "A"
    case b = "B"

    var id: String { rawValue }
    var opposite: Team { self == .a ? .b : .a }
}

enum MatchFormat: String, CaseIterable, Identifiable, Codable {
    case singleSet = "1 Set"
    case bestOf3 = "Melhor de 3"

    var id: String { rawValue }
    var setsToWin: Int { self == .singleSet ? 1 : 2 }
}

struct GameScore: Equatable, Codable {
    var pointsA: Int = 0
    var pointsB: Int = 0
    var isTiebreak: Bool = false
    var isGoldenPoint: Bool = false

    private static let labels = ["0", "15", "30", "40"]

    var isDeuce: Bool {
        !isTiebreak && !isGoldenPoint && pointsA == 3 && pointsB == 3
    }

    func display(for team: Team) -> String {
        let mine = team == .a ? pointsA : pointsB
        let theirs = team == .a ? pointsB : pointsA

        if isTiebreak { return "\(mine)" }

        if !isGoldenPoint {
            if mine == 3 && theirs == 3 { return "40" }
            if mine == 4 { return "AD" }
            if theirs == 4 { return "" }
        }
        return mine < Self.labels.count ? Self.labels[mine] : "\(mine)"
    }

    var winner: Team? {
        if isTiebreak {
            if pointsA >= 7 && pointsA - pointsB >= 2 { return .a }
            if pointsB >= 7 && pointsB - pointsA >= 2 { return .b }
        } else if isGoldenPoint {
            if pointsA > pointsB { return .a }
            if pointsB > pointsA { return .b }
        } else {
            if pointsA >= 4 && pointsA - pointsB >= 2 { return .a }
            if pointsB >= 4 && pointsB - pointsA >= 2 { return .b }
        }
        return nil
    }
}

struct SetScore: Identifiable, Equatable, Codable {
    var id = UUID()
    var gamesA: Int = 0
    var gamesB: Int = 0
    var isSuperTiebreak: Bool = false

    var isInTiebreak: Bool {
        !isSuperTiebreak && gamesA == 6 && gamesB == 6
    }

    var winner: Team? {
        if isSuperTiebreak {
            if gamesA >= 10 && gamesA - gamesB >= 2 { return .a }
            if gamesB >= 10 && gamesB - gamesA >= 2 { return .b }
            return nil
        }
        if gamesA == 7 && gamesB == 6 { return .a }
        if gamesB == 7 && gamesA == 6 { return .b }
        if gamesA >= 6 && gamesA - gamesB >= 2 { return .a }
        if gamesB >= 6 && gamesB - gamesA >= 2 { return .b }
        return nil
    }
}

struct MatchState: Codable {
    var sets: [SetScore]
    var currentGame: GameScore
}
