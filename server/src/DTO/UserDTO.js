class UserDTO {
    constructor(username, email, password) {
      this.username = username;
      this.email = email;
      this.password = password;
    }

    toString() {
        return `${this.username} email: ${this.email} password: ${this.password}`
    }
  }
  
  export default UserDTO;