export declare class FsSpeedScoringClass {
    points_in_time: number;
    total_score: number;
    constructor();
    static calculateScore: (marks: any[]) => number | null;
    static calculateCollation: (scArr: any[]) => any[];
}
