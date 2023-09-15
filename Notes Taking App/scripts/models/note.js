//ES6
// export default Note  => isme class as it is uthke chli jayegi;
//export -> create an object and store class in it and then export it 
// object m bharna is structuring and object se nikalna is destructuring
class Note {
    constructor(noteObject){
        //converting literal object to Note object
        for (let key in noteObject) {
            this[key] = noteObject[key];
        }
        this.isMarked = false;
    }
    // object vale kaam object m he krege (yhi p object k kaam ho rhe h)
    toggleMark() {
        this.isMarked = !this.isMarked;
    }
}

export default Note;