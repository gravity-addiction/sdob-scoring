export class FsSpeedScoringClass {
  public points_in_time = 0;
  public total_score = 0;

//  private static _instance: FsScoringClass = new FsScoringClass();
  constructor() {
//    if (FsScoringClass._instance) {
//      throw new Error('Error: Init failed, user FsScoringClass.getInstance() instead of new.');
//    }
//    FsScoringClass._instance = this;
  }

//  public static getInstance(): FsScoringClass {
//    return FsScoringClass._instance;
//  }

  static calculateScore = (marks: any[]): number | null => {
    if (!marks || marks.length < 2) { return null; }

    const mLen = marks.length || 0;
    // loop scorecards for info
    let exitTime = 0;
    let completedTime = 0;
    for (let m = 0; m < 2; m++) {
      if (marks[m].class === 'exit') {
        exitTime = Math.round((marks[m].time) * 100) / 100;
      } else {
        completedTime = Math.round((marks[m].time) * 100) / 100;
      }
    }
    return Math.round((completedTime - exitTime) * 100) / 100;
  };

  static calculateCollation = (scArr: any[]): any[] => {
    if (!scArr || !scArr.length) { return []; }

    const scLen = scArr.length || 0;
    // loop scorecards for info
    let exitTotal = 0;
    let exitAvg = 0;
    let startTotal = 0;
    let startAvg = 0;
    let needMarks = false;
    for (let sC = 0; sC < scLen; sC++) {
      const marks = scArr[sC];
      if (marks.length < 2) {
        needMarks = true;
        break;
      }
      for (let m = 0; m < 2; m++) {
        if (marks[m].class === 'exit') {
          exitTotal += marks[m].time;
        } else {
          startTotal += marks[m].time;
        }
      }
    }

    if (needMarks) {
      return [];
    }

    exitAvg = Math.round((exitTotal / scLen) * 100) / 100;
    startAvg = Math.round((startTotal / scLen) * 100) / 100;

    return [
      {class: 'exit', time: exitAvg},
      {class: 'point', time: startAvg}
    ]
  };
}
