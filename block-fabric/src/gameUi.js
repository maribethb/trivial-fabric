import { fabric } from 'fabric';

export class GameUi {
  constructor(id) {
    this.height = 500;
    this.width = 500;
    this.colors = this.makeColorsObject();
    this.makeCanvas(id);
  }

  makeColorsObject() {
    return {
      background: '#16697A',
      questionBackground: '#489FB5',
      badAnswerBackground: '#82C0CC',
      goodAnswerBackground: '#EDE7E3'
    }
  }

  makeCanvas(id) {
    this.canvas = new fabric.StaticCanvas(id,
      {
        width: this.width,
        height: this.height,
        backgroundColor: this.colors.background
      });
  }

  renderQuestion(triviaQuestion) {
    this.question = triviaQuestion;
    this.renderQuestionBackground();
    this.renderQuestionText();
    this.renderAnswerOptions();
  }

  renderAnswerOptions() {
    this.question.answerOptions.forEach((element, index) => {
      this.renderAnswerOption(index, element);
    });
  }

  renderQuestionBackground() {
    this.canvas.add(new fabric.Rect({
      top: 50, left: 50, width: 400, height: 70, fill: this.colors.questionBackground
    }));
  }

  renderQuestionText() {
    const text = new fabric.Text(this.question.questionText, { left: 100, top: 60 });
    this.canvas.add(text);
  }

  renderAnswerOption(index, option) {
    const { text, correct } = option;
    this.renderAnswerOptionBackground(index, correct);
    this.renderAnswerOptionText(index, text);
  }

  renderAnswerOptionBackground(index, correct) {
    const top = 175 + (index * 75);
    const background = correct ? this.colors.goodAnswerBackground : this.colors.badAnswerBackground;
    this.canvas.add(new fabric.Rect({
      top: top, left: 50, width: 400, height: 50, fill: background
    }));
  }

  renderAnswerOptionText(index, optionText) {
    const top = 175 + (index * 75) + 5;
    const text = new fabric.Text(optionText, { left: 100, top: top });
    this.canvas.add(text);
  }
}
