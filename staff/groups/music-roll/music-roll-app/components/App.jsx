const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: 'home',

            token: "BQA9mJ03s3gLUDqZY1hktBkvaY5nT_DZVt6BD0Kz-5kbvDJKJz0hEySTnAQi7UXqWeKGP6tlXhQsbrVjFDRg5rHq5czCTMbnSm_XXdSaCIysoQSglTLESG_vR959uFxUL-ptTOZw5SunXAdP-DV_5Iyh3RIq2cP1fs9obCz2yXZsrdi6xpkg_v59PogB"



        }
    }


    onChangeView = (_view) => this.setState({ view: _view })

    handleLogin = (_token) => {
        this.setState({ token: _token })

        this.setState({ view: 'home' })
    }

    handleRegister = () => {
        this.onChangeView('login')
    }



    render() {
        return <>
            {this.state.view === 'login' && <Login onSubmit={this.handleLogin} onRegister={this.onChangeView} />}
            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} onLogin={this.onChangeView} />}

            <Navbar onChangeView={this.onChangeView} />

            {this.state.view === 'home' && <Home />}
            {this.state.view === 'browser' && <Browser token={this.state.token} />}

        </>

    }
}