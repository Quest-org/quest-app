// * Type definitions

/**
 * * User
 */
export interface User {
    username: string;   //* The unique identifier
    credential: string;
    avatarUrl: string;
}

/**
 * * Questionnaire data type
 */
export interface Quest {
    id: string;
    title: string;
    descrip: string;    //* description

    //* color of the quest tag
    color: 'gray' | 'red' | 'orange' | 'green' | 'blue' | 'purple';

    /**
     * * Questionnaire status
     * created: created but not deployed
     * deployed: deployed but not ended
     * paused: paused after deployed
     * ended: quest ended
     * error: error status
     */
    status: 'undeployed' | 'deployed' | 'paused' | 'ended' | 'error';

    errorCode: number;
    errorMsg: string;

    owner: string; //* The username of the user that owns the questionnaire

    /**
     * * Timing of actions
     * the scheduled timing may be differ from the time when the action actually happens
     */
    createdTime: Date;
    schedDeployTime: Date;  //* sceduled deploy time
    deployedTime: Date;
    lastPausedTime: Date;
    schedEndTime: Date;
    endedTime: Date;

    questions: QuestionGraph;

    answerCount: number;
    validAnswerCount: number;
}

/**
 * * The data structure to store question relations
 * * This interface is intended for data transfer
 */
export interface QuestionGraph {
    nodes: QuestionGraphNode[];
}

export interface QuestionGraphNode {
    data: QuestionBase;
    nextIndexes: number[];
}

/**
 * * Question Base interface
 * contains the answers by respondents to the question
 */
export interface QuestionBase {
    id: string;
    title: string;
    descrip: string;
    answers: AnswerBase[];
}

export interface AnswerBase {

}