/**
 * request params
 */

// 把存入local的用户信息取出来
if (localStorage.USERINFO) {
    var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
    var accountId = userInfo.accountId;
    var accessToken = userInfo.accessToken;
    var userPhone = userInfo.phone;
    var userAvatar = userInfo.accountAvatar;
}

export const params =
    {
        //分页查询
        page: 1,
        pageSize: 1,
        morePage: 2,
        morePageSize: 10,
        accountId: accountId || null,
        accessToken: accessToken || null,

        // 用户信息
        phone: userPhone || null,
        avatar: userAvatar || null,

        // 收藏参数
        musicCollect: 1,
        linesCollect: 2,
        successCollect: 1,
        cancelCollect: 2,

        // 点赞参数
        commentLike: 1,
        linesLike: 2,
        musicLike: 3,
        commentaryLike: 4,

        // 评论参数
        musicComment: 1,
        storyComment: 2,

        // 评论排序参数
        timeSort: 1,
        likeSort: 2,

        // 我的点赞和收藏全部类型
        allLike: 0,
        allCollect: 0,
    }