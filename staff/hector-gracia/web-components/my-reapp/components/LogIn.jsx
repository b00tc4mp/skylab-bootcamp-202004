class Login extends Component{
    constructor(props){
        super(props)
        this.state={formEmail:"",formPassword:""};
    }
    handleSubmit=event=>{
        event.preventDefault();
        this.props.onSubmit(this.state.formEmail,this.state.formPassword);
        this.cleanForm();
    }
    handleRegister=event=>{
        event.preventDefault();
        this.props.onRegister();
        this.cleanForm();
    }
    handleChangeEmail=event=>this.setState({formEmail:event.target.value})
    handleChangePassword=event=>this.setState({formPassword:event.target.value})
    cleanForm(){
        this.state.formEmail="";
        this.state.password="";
    }
    render(){
        return <section className="login">
        <h1 className="peter__title">Login</h1>
        <form className="peter__form" onSubmit={this.handleSubmit}>
            <input className="peter__input" type="email" name="email" placeholder="e-mail" required value={this.state.formEmail} onChange={this.handleChangeEmail}/>
            <input className="peter__input" type="password" name="password" placeholder="password" required value={this.state.formPassword} onChange={this.handleChangePassword} />
            <button type="submit" className="peter__button">SUBMIT</button>
            <a href="" className="peter__link" onClick={this.handleRegister}>I'm new using Peter</a>

        </form>

    </section>
    }
}