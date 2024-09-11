import { AuthProvider } from "./context/authContext"
import { CalendarProvider } from "./context/calendarContext"
import { GeneralProvider } from "./context/generalContext"
import { UsersProvider } from "./context/usersContext"
import { Router } from "./Router"


function App() {

  return (
    <GeneralProvider>
      <AuthProvider>
        <UsersProvider>
          <CalendarProvider>
            <Router />
          </CalendarProvider>
        </UsersProvider>
      </AuthProvider>
    </GeneralProvider>
  )
}

export default App
