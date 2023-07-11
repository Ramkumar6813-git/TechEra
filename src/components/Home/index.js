import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    coursesList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount = () => {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({
      apiStatus: apiConstants.loading,
    })
    const options = {
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  displayCourses = () => {
    const {coursesList} = this.state
    return (
      <div className="courses-container">
        <h1 className="heading">Courses</h1>
        <ul className="course-items-list">
          {coursesList.map(eachCourseItem => (
            <CourseItem
              key={eachCourseItem.id}
              courseDetails={eachCourseItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  displayFailureView = () => (
    <div className="failure-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure-view"
        className="failure-image"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getCourses()}
      >
        Retry
      </button>
    </div>
  )

  displayLoader = () => (
    <div data-testid="loader" className="loader-div">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourses = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.displayCourses()
      case apiConstants.failure:
        return this.displayFailureView()
      case apiConstants.loading:
        return this.displayLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourses()}
      </>
    )
  }
}

export default Home
