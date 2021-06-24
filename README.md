# Code Quiz

This assignment focuses on using DOM manipulation to create a timed quiz with multiple-choice questions. Throughout the quiz, there should be a timer counting down. There was a need to create event listeners for several buttons, to start the quiz, to indicate whether the user chose the correct answer or not, to input their initials to save their score, and to check their high scores. 

I decided to use an array of objects for the quiz questions, as this was easier to iterate through, resulting in less code than if I had simply updated the DOM elements on their own individual lines of code. There was a need for <code>setTimeout()</code> for the timer. I chose to use <code>appendChild</code> in some places for the practice, though the same effect could be accomplished with setting display properties on existing elements in the HTML. 


## Screenshot of completed application:
![Screenshot of Tucker's completed Password Generator](images/finished-password-generator.png "Tucker's completed Password Generator")

## Link to deployed application:
[Tucker Barrett's Horiseon](http://grinninbarrett.github.io/password-generator "Tucker's deployed password generator application")