import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails
  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="course-item">
        <img src={logoUrl} className="course-image" alt={name} />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
