const axios = require("axios");
const read = require("readline-sync");

const url = "http://saral.navgurukul.org/api";
const coursesUrl = url + "/courses";

axios.get(coursesUrl).then(response => {
    const availableCourses = response.data.availableCourses;
    const id_list = []
    for (let i = 0; i < availableCourses.length; i++) {
        let courses = availableCourses[i];
        console.log("----------------------");
        console.log(i + 1, "Courses Name", courses.name);
        console.log("Course Id", courses.id);
        id_list.push(courses.id)
    }
    return id_list
}).then((id_list) => {
    var number = read.question("enter course id which you\n")
    return id_list[number-1]
    
}).then((number) => {
    console.log(".........Welcome in course..........")
    const newUrl = url + "/courses/" + number + "/exercises"
    return axios.get(newUrl).then((response) => {
        const allExercise = response.data.data;
        const parent_slug = []
        var count=1
        for (let i = 0; i < allExercise.length; i++) {
            let exercises = allExercise[i]
            console.log(".................");
            console.log(count, "Exercise:-", exercises.name)
            count++
            parent_slug.push(exercises.slug);
            //console.log("childExercises",exercises.childExercises)
            let exercise = exercises.childExercises
            for (let j = 0; j < exercise.length; j++) {
                console.log("   ", count, exercise[j].name)
                count++
                parent_slug.push(exercise[j].slug)
            }
        }
        return parent_slug
    })
}).then((parent_slug) => {
    let user_input = read.question("Enter Your number:- ")
    return parent_slug[user_input-1]
}).then(user_input => {
    const slug_url = "http://saral.navgurukul.org/api/courses/0/exercise/getBySlug?slug=" + user_input;
    axios.get(slug_url).then((response) => {
        console.log(response.data.content)
    })
})