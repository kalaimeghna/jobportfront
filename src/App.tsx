import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext"; // or your Redux Provider

function App() {
  return (
    // The Provider makes 'user' data available to PrivateRoute and RoleRoute
    <AuthProvider> 
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;