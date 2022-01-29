export declare class FsScoringClass {
    points_in_time: number;
    total_score: number;
    constructor();
    static calculatePit(marks: any[]): number;
    static calculateScore(marks: any[]): number;
    static calculateCollation: (scArr: any[]) => any[];
}
