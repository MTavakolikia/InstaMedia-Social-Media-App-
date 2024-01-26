import { Route, Routes } from "react-router-dom"
import SigninForm from "./_auth/forms/SigninForm"
import SignupForm from "./_auth/forms/SignupForm"
import { Home } from "./_root/pages"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
function App() {

  return (
    <main className="flex h-screen bg-slate-700">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
