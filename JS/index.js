document.addEventListener('DOMContentLoaded', function () {
  const displayedAnswers = document.querySelectorAll('.answers');
  const selectedQuestions = document.querySelectorAll('.questions');
  const arrowDown = document.querySelectorAll('.arrowDown');

  displayedAnswers.forEach(function (answer) {
    answer.style.display = 'none';
  });

  function show(event) {
    event.preventDefault();
    const clickedQuestion = this;
    const correspondingAnswer = document.querySelector(
      `.answers[data-question-id="${clickedQuestion.dataset.questionId}"]`
    );

    if (correspondingAnswer.style.display === 'none') {
      displayedAnswers.forEach(function (answer) {
        answer.style.display = 'none';
      });
      correspondingAnswer.style.display = 'block';
      selectedQuestions.forEach(function (question) {
        question.classList.remove('clicked');
      });
      clickedQuestion.classList.add('clicked');

      // Get the corresponding arrow using the data-question-id attribute
      const questionId = clickedQuestion.dataset.questionId;
      const arrow = document.querySelector(`.arrowDown[data-question-id="${questionId}"]`);

      const currentRotation = parseInt(arrow.getAttribute('data-rotation')) || 0;
      const newRotation = currentRotation + 180;

      // Rotate the arrow down
      arrow.style.transform = `rotate(${newRotation}deg)`;
      arrow.setAttribute('data-rotation', newRotation);

      // Reset the rotation for other arrows
      arrowDown.forEach(function (otherArrow) {
        if (otherArrow !== arrow) {
          otherArrow.style.transform = 'rotate(0deg)';
          otherArrow.setAttribute('data-rotation', 0);
        }
      });
    } else {
      correspondingAnswer.style.display = 'none';
      clickedQuestion.classList.remove('clicked');

      // Rotate the arrow up when clicking the same question again
      const questionId = clickedQuestion.dataset.questionId;
      const arrow = document.querySelector(`.arrowDown[data-question-id="${questionId}"]`);
      arrow.style.transform = 'rotate(0deg)';
      arrow.setAttribute('data-rotation', 0);
    }
  }

  // Add a click event listener to each question (selectedQuestions)
  selectedQuestions.forEach(function (question) {
    question.addEventListener('click', show);
    question.classList.remove('clicked'); // Remove the 'clicked' class initially
  });
});
