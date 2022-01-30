/**
 * * Mock-up data
 */

import { User, Quest } from '../types/index';

const userMockUp: User = {
    username: '泡芙奶糕我都要',
    avatarUrl: 'https://s4.ax1x.com/2022/01/23/7IZV8U.jpg',
    credential: null
};

const questListMockUp: Partial<Quest>[] = [
    {
        id: "1",
        title: "景观疗愈作用调查",
        descrip: "如果那两个字没有颤抖，我不会发现 我难受，怎么说出口，也不过是分手，如果对于明天没有要求，牵牵手就像旅游，成千上万个门口，总有个人要先走。",
        status: 'deployed',
        createdTime: new Date('2022-02-03T08:34:00'),
        deployedTime: new Date('2022-02-05T19:32:00'),
        lastPausedTime: new Date('2022-02-17T19:32:00'),
        endedTime: new Date('2022-03-17T19:32:00'),
        validAnswerCount: 132,
        answerCount: 132,
        color: 'orange'
    }, {
        id: "2",
        title: "员工对公司工作环境满意度、员工工作强度以及绩效情况调查问卷",
        descrip: "为什么你不在，问山风你会回来，夏天的风，我永远记得，清清楚楚的说你爱我，我看见你酷酷的笑容，也有腼腆的时候，夏天的风，正暖暖过，穿过头发穿过耳朵，你和我的夏天，风轻轻说着。",
        status: 'deployed',
        createdTime: new Date('2022-02-03T08:34:00'),
        deployedTime: new Date('2022-02-05T19:32:00'),
        lastPausedTime: new Date('2022-02-17T19:32:00'),
        endedTime: new Date('2022-03-17T19:32:00'),
        validAnswerCount: 987,
        answerCount: 999,
        color: 'red'
    }, {
        id: "3",
        title: "大学生环境问题知识调查",
        descrip: "调查当代大学生对大气污染、水环境污染、垃圾处理、土地荒漠化和沙灾问题、水土流失、旱灾和水灾、 生物多样性破坏问题等等环境问题的了和关注程度。",
        status: 'ended',
        createdTime: new Date('2022-02-03T08:34:00'),
        deployedTime: new Date('2022-02-05T19:32:00'),
        lastPausedTime: new Date('2022-02-17T19:32:00'),
        endedTime: new Date('2022-03-17T19:32:00'),
        validAnswerCount: 2000,
        answerCount: 2000,
        color: 'gray'
    }, {
        id: "4",
        title: "四大名著阅读情况调查",
        descrip: "怎么去拥有，一道彩虹，怎么去拥抱，一夏天的风，天上的星星，笑地上的人。",
        status: 'undeployed',
        createdTime: new Date('2022-02-03T08:34:00'),
        deployedTime: new Date('2022-02-05T19:32:00'),
        lastPausedTime: new Date('2022-02-17T19:32:00'),
        endedTime: new Date('2022-03-17T19:32:00'),
        color: 'green'
    }, {
        id: "5",
        title: "XX学院教学满意度调查",
        descrip: "我和你撑伞雨中穿行，收集每一个点点滴滴，喜欢你瞪着大大眼睛，对什么事情都很好奇，每天拿着苹果想定律，可爱到连吃饭都忘记。",
        status: 'paused',
        createdTime: new Date('2022-02-03T08:34:00'),
        deployedTime: new Date('2022-02-05T19:32:00'),
        lastPausedTime: new Date('2022-02-17T19:32:00'),
        endedTime: new Date('2022-03-17T19:32:00'),
        validAnswerCount: 206,
        answerCount: 265,
        color: 'blue'
    }, {
        id: "6",
        title: "返乡人员相关信息收集表",
        descrip: "我说过 我不闪躲，我非要这么做，讲不听 也偏要爱，更努力爱 让你明白，没有别条路能走，你决定要不要陪我，讲不听 偏爱，靠我感觉爱，等…的依赖。把昨天都作废，现在你在我眼前，我想爱 请给我机会，如果我错了也承担，认定你就是答案，我不怕谁嘲笑我极端，相信自己的直觉，顽固的人不喊累，爱上你 我不撤退，我说过 我不闪躲，我非要这么做，讲不听 也偏要爱，更努力爱 让你明白，没有别条路能走，你决定要不要陪我，讲不听 偏爱，靠我感觉爱，等你的依赖，我非要这么做，讲不听 也偏要爱，更努力爱 让你明白，没有别条路能走，你决定要不要陪我，讲不听 偏爱，靠我感觉爱，等你的依赖。把昨天都作废，现在你在我眼前，我想爱 请给我机会，如果我错了也承担，认定你就是答案，我不怕谁嘲笑我极端，相信自己的直觉，顽固的人不喊累，爱上你 我不撤退，我说过 我不闪躲，我非要这么做，讲不听 也偏要爱，更努力爱 让你明白，没有别条路能走，你决定要不要陪我，讲不听 偏爱，靠我感觉爱，等你的依赖",
        status: 'undeployed',
        createdTime: new Date('2022-02-03T08:34:00'),
        color: 'purple'
    }, {
        id: "7",
        title: "风俗小吃好感度调查",
        descrip: "后来 我总算学会了如何去爱，可惜你 早已远去 消失在人海，后来 终于在眼泪中明白，有些人 一旦错过就不在，栀子花 白花瓣 落在我蓝色百褶裙上",
        status: 'undeployed',
        createdTime: new Date('2022-02-03T08:34:00'),
        deployedTime: new Date('2022-02-05T19:32:00'),
        lastPausedTime: new Date('2022-02-17T19:32:00'),
        endedTime: new Date('2022-03-17T19:32:00'),
        color: 'blue'
    }, {
        id: "8",
        title: "XX学院本科生宿舍设施满意度调查",
        descrip: "我和你撑伞雨中穿行，收集每一个点点滴滴，喜欢你瞪着大大眼睛，对什么事情都很好奇，每天拿着苹果想定律，可爱到连吃饭都忘记。",
        status: 'undeployed',
        createdTime: new Date('2022-02-03T08:34:00'),
        deployedTime: new Date('2022-02-05T19:32:00'),
        lastPausedTime: new Date('2022-02-17T19:32:00'),
        endedTime: new Date('2022-03-17T19:32:00'),
        color: 'orange'
    }, {
        id: "9",
        title: "XX市最美公园评选",
        descrip: "收到需要赶快回复的信息，那就考虑看看是不是要回应你，如果说以后都不用对你讲客气，我就等着对你说一句欢迎光临",
        status: 'undeployed',
        createdTime: new Date('2022-02-03T08:34:00'),
        deployedTime: new Date('2022-02-05T19:32:00'),
        lastPausedTime: new Date('2022-02-17T19:32:00'),
        endedTime: new Date('2022-03-17T19:32:00'),
        color: 'purple'
    }
];

function getQuestById(id: string) {
    return new Promise<Partial<Quest>>((resolve, reject) => {
        setTimeout(() => {
            const quest = questListMockUp.find((value) => value.id === id);
            quest === null ? reject(404) : resolve(quest);
        }, 500);
    });
}

function getUserQuestIdList(status?: Quest['status'] | '/', color?: Quest['color'] | '/', search?: string) {
    status = status || '/';
    color = color || '/';
    search = search || '';
    return new Promise<string[]>((resolve) => {
        setTimeout(() => {
            resolve(questListMockUp.filter((elem) =>
                (status === '/' ? true : elem.status === status)
                && (color === '/' ? true : elem.color === color)
                && (!search ? true : (elem.title.includes(search) || elem.descrip.includes(search)))
            ).map(elem => elem.id));
        }, 500);
    })
}

async function deleteQuest(id: string) {
    const target = await getQuestById(id);
    if (!target) return 404;
    else questListMockUp.splice(questListMockUp.indexOf(target), 1);

    return 200;
}

async function setQuestStatus(id: string, status: Quest['status']) {
    const target = await getQuestById(id);
    if (!target) return 404;
    else {
        target.status = status;
    }
    return 200;
}

async function markQuest(id: string, color: Quest['color']) {
    const target = await getQuestById(id);
    if (!target) return 404;
    else target.color = color;

    return 200;
}

export {
    userMockUp,
    questListMockUp,
    getQuestById,
    getUserQuestIdList,
    deleteQuest,
    setQuestStatus,
    markQuest
};