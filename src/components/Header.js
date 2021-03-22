import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()
    // this is a function withing header
    // this onClick function will be pass to Button.js component
    // const onClick = () => {
    //     console.log('Clicked within header')
    // }

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && (<Button 
            // you are passing color with the value of green
            color={showAdd ? 'red' : 'green'}
            // you are passing text with the value of Add
            text={showAdd ? 'Close' : 'Add'}
            // you are passing an onClick event name onClick
            onClick={onAdd}/>)}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
