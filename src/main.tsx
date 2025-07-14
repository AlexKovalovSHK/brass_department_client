import { BrowserRouter } from "react-router-dom"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./App"
import { store } from "./app/store"
import "./index.css"
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const container = document.getElementById("root")
const queryClient = new QueryClient()

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Provider>
        </BrowserRouter>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
