class AvatarDTO {
  constructor(userID ,image = "", name = "", career = "", specialty = "", attributes = {}) {
    this.userID = userID
    this.image = image;
    this.name = name;
    this.career = career;
    this.specialty = specialty;
    this.attributes = attributes;
  }

  toString() {
    return `${this.image} ${this.name} career: ${this.career} ${this.specialty}`;
  }
}

export default AvatarDTO;
