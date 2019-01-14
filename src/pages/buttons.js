import React from 'react'
import connect from '@/connect'


class Buttons extends React.Component {
    
    btnClasses = [
        '',
        'btn-white',
        'btn-black',
        'btn-primary',
        'btn-success',
        'btn-warning',
        'btn-danger'
    ]

    render() {
        return (
            <main>
                <div className="box">
                    <h3>Default</h3>
                    <div className="btn-group mt1 mb1">
                        { this.btnClasses.map(prefix => <button key={prefix} className={'btn ' + prefix}>Button</button>) }
                    </div>

                    <h3>Transparent</h3>
                    <div className="btn-group mt1 mb1">
                        { this.btnClasses.map(prefix => <button key={prefix} className={'btn btn-tr ' + prefix}>Button</button>) }
                    </div>

                    <h3>Material</h3>
                    <div className="btn-group mt1 mb1">
                        { this.btnClasses.map(prefix => <button key={prefix} className={'btn btn-mt ' + prefix}>Button</button>) }
                    </div>

                    <h3>Flat</h3>
                    <div className="btn-group mt1 mb1">
                        { this.btnClasses.map(prefix => <button key={prefix} className={'btn btn-flat ' + prefix}>Button</button>) }
                    </div>

                    <h3>Social</h3>
                    <div className="mt1 mb1 social-buttons">
                        <a href="javascript:void(0)" className="facebook"><i className="mdi mdi-facebook"></i></a>
                        <a href="javascript:void(0)" className="vkontakte"><i className="mdi mdi-vk"></i></a>
                        <a href="javascript:void(0)" className="linkedin"><i className="mdi mdi-linkedin"></i></a>
                        <a href="javascript:void(0)" className="twitter"><i className="mdi mdi-twitter"></i></a>
                        <a href="javascript:void(0)" className="pinterest"><i className="mdi mdi-pinterest"></i></a>
                        <a href="javascript:void(0)" className="youtube"><i className="mdi mdi-youtube"></i></a>
                        <a href="javascript:void(0)" className="google"><i className="mdi mdi-google-plus"></i></a>
                        <a href="javascript:void(0)" className="instagram"><i className="mdi mdi-instagram"></i></a>
                        <a href="javascript:void(0)" className="foursquare"><i className="mdi mdi-foursquare"></i></a>
                    </div>

                    <h3>Sizes</h3>
                    <div className="btn-group mt1 mb1">
                        <a href="javascript:void(0)" className="btn btn-primary btn-xl">Button</a>
                        <a href="javascript:void(0)" className="btn btn-primary btn-lg">Button</a>
                        <a href="javascript:void(0)" className="btn btn-primary">Button</a>
                        <a href="javascript:void(0)" className="btn btn-primary btn-sm">Button</a>
                        <a href="javascript:void(0)" className="btn btn-primary btn-xs">Button</a>
                    </div>
                    
                </div>
            </main>
        )
    }
}

export default connect(Buttons)