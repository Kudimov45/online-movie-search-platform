import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'
import {Loader} from './components/Loader/Loader'

const LazyMainPage = lazy(() => import("./pages/MainPage/MainPage"))
const LazyGenrePage = lazy(() => import("./pages/GenrePage/GenrePage"))
const LazyGenreMoviesPage = lazy(() => import("./pages/GenreMoviesPage/GenreMoviesPage"))
const LazyMovieInfoPage = lazy(() => import("./pages/MovieInfoPage/MovieInfoPage"))
const LazyCusomLayout = lazy(() => import("./components/Layout/Layout"))
const LazyProfileLayout = lazy(() => import("./pages/ProfilePage/ProfilePage"))


function App() {


  return (
    <>
      <BrowserRouter>
			<Suspense fallback={<><Loader/></>}>
				<Routes>
					<Route path="/" element={<LazyCusomLayout />}>
						<Route index path="" element={<LazyMainPage />} />
						<Route path="genre" element={<LazyGenrePage />} />
						<Route path="movies/:genre" element={<LazyGenreMoviesPage />} />
						<Route path="movie/:movieId" element={<LazyMovieInfoPage />} />
						<Route path="profile" element={<LazyProfileLayout />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
    </>
  )
}

export default App
