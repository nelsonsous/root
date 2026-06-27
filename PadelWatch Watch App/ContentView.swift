import SwiftUI

struct ContentView: View {
    @EnvironmentObject var store: MatchStore

    var body: some View {
        if let match = store.currentMatch {
            LiveScoreView(match: match)
        } else {
            SetupView()
        }
    }
}
