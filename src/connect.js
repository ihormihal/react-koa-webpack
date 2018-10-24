import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withI18n } from "react-i18next"

//defaults
const mapState = (state) => {
    return {}
}
const mapActions = {}


//connect function
const connectAll = (component, stateToProps = mapState, actions = mapActions) => {
    return withI18n()(
        withRouter(
            connect(
                stateToProps,
                (dispatch) => ({
                    actions: bindActionCreators(actions, dispatch)
                })
            )(component)
        )
    )
}

export default connectAll