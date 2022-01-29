export class FsScoringClass {
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


  static calculatePit(marks: any[]): number {
    let curScore = 0;
    const mLen = marks.length;
    for (let i = 0; i < mLen; i++) {
      if (marks[i].class !== 'blank' && marks[i].class !== 'exit') {
        curScore += 1;
      }
    }
    return curScore;
  }

  static calculateScore(marks: any[]): number {
    let curScore = 0;
    const mLen = marks.length;
    for (let i = 0; i < mLen; i++) {
      if (marks[i].class === 'point') {
        curScore += 1;
      } else if (marks[i].class === 'omission') {
        curScore -= 2;
      }
    }
    if (curScore < 0) { curScore = 0; }
    return curScore;
  }


  static calculateCollation = (scArr: any[]): any[] => {
    if (!scArr || !scArr.length) { return []; }
  
    const scLen = scArr.length;
    const sc_info: any[] = [];
    let longestScorecard = 0; // most number of points on a scorecard
    let highColl = -1; // highest mark with collation
  
    // loop for info
    for (let sC = 0; sC < scLen; sC++) {
      if (scArr[sC].length > longestScorecard) { longestScorecard = scArr[sC].length; }
    }
  
    // console.log('Longest', longestScorecard);
    for (let sP = 0; sP < longestScorecard; sP++) {
      const markNames = ['point', 'bust', 'omission', 'noview', 'blank', 'exit'],
            arrMarks = [0, 0, 0, 0, 0, 0];
  
      if (highColl === highColl - 1) { highColl = sP; } // Increase highest collation when sequence still solid
      for (let sC = 0; sC < scLen; sC++) {
        if (scArr[sC].length <= sP) {
          if (highColl === sP) { highColl -= 1; } // break collation sequence
          arrMarks[1] += 1; // count a non-mark as a bust
          continue;
        }
  
        // add this mark to final scorecard
        if (scArr[sC][sP].class === 'point') { arrMarks[0] += 1;
        } else if (scArr[sC][sP].class === 'bust') { arrMarks[1] += 1;
        } else if (scArr[sC][sP].class === 'omission') { arrMarks[2] += 1;
        } else if (scArr[sC][sP].class === 'nv') { arrMarks[1] += 1; // mark NV as a bust so tiebreak doesn't happen here
        } else if (scArr[sC][sP].class === 'blank' || scArr[sC][sP].class === '') { arrMarks[4] += 1;
        } else if (scArr[sC][sP].class === 'exit' || scArr[sC][sP].class === '') { arrMarks[5] += 1;
        }
      }
  
      // Find largest scored mark type for this point
      const highMark = Math.max.apply(Math.max, arrMarks),
            topMarks = arrMarks.filter((m: number) => m === highMark) || [];

      sc_info.push({class: markNames[arrMarks.indexOf(highMark)]});
  /*
      // confirm we don't tie between two different types of marks
      if (topMarks.length === 1) {
        sc_info.push({class: markNames[arrMarks.indexOf(highMark)]});
      } else {
        if (!sc_info.length && markNames[arrMarks.indexOf(highMark)] === 'blank') {
          sc_info.push({class: 'blank'});
        } else if (!sc_info.length && markNames[arrMarks.indexOf(highMark)] === 'exit') {
          sc_info.push({class: 'exit'});
        } else {
          sc_info.push({class: 'tiebreak'});
        }
      }
*/
    }
  
    return sc_info;
  };
}
