import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
    //this is a function within Button.js component
    // const onClick = () => {
    //     console.log("you click")
    // }

    return <button onClick={onClick}
        style={{ backgroundColor: color }}
        className="btn">{text}</button>
}

Button.defaultProps = {
    color: 'steelblue',
    text: 'Button'
}

// This will define the propeties being passed
Button.propTypes = {
    // text is now type string
    text: PropTypes.string,
    // color is now type string
    color: PropTypes.string,
    // onClick is now a function
    onClick: PropTypes.func
}
export default Button
