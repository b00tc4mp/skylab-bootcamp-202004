class Register extends Component{
    constructor(props){
        super()
        this.state={formName:"",formSurname:"",formEmail:"",formPassword:""};
    }
    handleSubmit=event=>{
        event.preventDefault();
        this.props.onSubmit(this.state.formName,this.state.formSurname,this.state.formEmail,this.state.formPassword);
        this.cleanForm();
    }
    handleLogin=event=>{
        event.preventDefault();
        this.props.onLogin();
        this.cleanForm();
    }
    //Mete los datos del formulario dentro del estado del componente a medida que se cambian
    
    handleChangeName=event=>this.setState({formName:event.target.value})
    handleChangeSurname=event=>this.setState({formSurname:event.target.value})
    handleChangeEmail=event=>this.setState({formEmail:event.target.value})
    handleChangePassword=event=>this.setState({formPassword:event.target.value})
    //Vacia los campos cuando cambio de pantalla
    cleanForm(){
        this.state.formName="";
        this.state.formSurname="";
        this.state.formEmail="";
        this.state.password="";
    }
    render(){
        return <section className="register">
            <h1 className="peter__title">Create a new account</h1>
            <form className="peter__form" onSubmit={this.handleSubmit}>
                <input className="peter__input" type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" value={this.state.name} onChange={this.handleChangeName}/>
                <input className="peter__input" type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" value={this.state.surname} onChange={this.handleChangeSurname}/>
                <input className="peter__input" type="email" name="email" placeholder="e-mail" required value={this.state.email} onChange={this.handleChangeEmail}/>
                <input className="peter__input" type="password" name="password" placeholder="password" required minLength="8" value={this.state.password} onChange={this.handleChangePassword}/>
                <button className="peter__button">SUBMIT</button>
                or <a href="" className="peter__link" onClick={this.handleLogin}>I already have an account</a>
            </form>
        </section>
    }
}