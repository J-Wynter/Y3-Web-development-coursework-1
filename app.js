
// Vue Router setup
const routes = [
  { path: "/", component: Home },
  { path: "/account", component: accounts },
  { path: "/login", component: login },
  { path: "/lessons", component: Lessons, props: true },
  { path: "/basket", component: Basket, props: true },
];

const router = new VueRouter({
  routes,
});
new Vue({
  el: "#app",
  router,
  data: {
    user:"",
    Customers:[],
    login: "",
    accounts: "",
    sitename: "Learnify",
    lessons: [],
    orders: [],
    imageBaseURL: "https://y3-web-development-coursework-1-main.onrender.com",
    serverBaseURL: "https://y3-web-development-coursework-1-main.onrender.com",
   },
  computed: {
    totalCartCount() {
      return this.lessons.reduce(
        (total, lesson) => total + lesson.cartCounter,
        0
      );
    },
  },
  // conouted function that stores lessons in database
  methods: {
    async getLessons(){
      try{
        response = await fetch(`${this.serverBaseURL}/lessons`);
        const data = await response.json(); // Parse the JSON response
        this.lessons = data; // Store lessons in Vue's data
    } catch (error){
      console.log('error fetching lessons:', error);
    }
    },
    async  lessonValidation(lessons) {
      try {
        // Iterate over the lessons array
        for (const lesson of lessons) {
          // Check if a lesson with the same ID already exists
          const existingLesson = await collection.findOne({ id: lesson.id });
    
          if (existingLesson) {
            console.log(`Lesson with id ${lesson.id} already exists. Skipping insertion.`);
          } else {
            // Insert the lesson if it doesn't exist
            await collection.insertMany(lesson);
            console.log(`Lesson with id ${lesson.id} inserted successfully.`);
          }
        }
      } catch (err) {
        console.error('Error inserting lessons:', err);
      }
    },
    
    updateCartCount() {
      // Triggers recalculation of the total cart count
    },
    
    updateSpaces() {
      // Update lesson spaces logic here
    },
  },
  created() {
    this.getLessons(); 
  },
});
