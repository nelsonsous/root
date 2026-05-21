import SwiftUI

@main
struct PadelWatchApp: App {
    @StateObject private var store = MatchStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(store)
        }
    }
}
