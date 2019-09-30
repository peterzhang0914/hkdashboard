let webstockUrl = process.env.VUE_APP_WS_BASEURL;
let WebSocketObj = Object;
var lockReconnect = false;//避免重复连接
var tt;

function createWebSocket () {
    try {
        WebSocketObj = new WebSocket(webstockUrl);
        // eslint-disable-next-line no-console
        console.log('初始化');
        init();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        // eslint-disable-next-line no-console
        console.log('catch');
        reconnect(webstockUrl);
    }
}

function init () {
    WebSocketObj.onclose = function () {
        // eslint-disable-next-line no-console
        console.log('链接关闭');
        reconnect(webstockUrl);
    };
    WebSocketObj.onerror = function () {
        // eslint-disable-next-line no-console
        console.log('发生异常了');
        reconnect(webstockUrl);
    };
    WebSocketObj.onopen = function () {
        //心跳检测重置
        heartCheck.start();
    };
    WebSocketObj.onmessage = function (event) {
        //拿到任何消息都说明当前连接是正常的
        // eslint-disable-next-line no-console
        console.log(event.data)
        heartCheck.start();
    }
}

/**
 * 尝试重连
 * @param url
 */
function reconnect (url) {
    // eslint-disable-next-line no-console
    console.log('尝试重连', lockReconnect);
    if (lockReconnect) {
        return;
    }
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    tt && clearTimeout(tt);
    tt = setTimeout(function () {
        createWebSocket(url);
        lockReconnect = false;
    }, 5000);
}

//心跳检测
var heartCheck = {
    timeout: 5000,
    timeoutObj: null,
    serverTimeoutObj: null,
    start: function () {
        // console.log('start');
        var self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            WebSocketObj.send("ping");
            self.serverTimeoutObj = setTimeout(function () {
                // eslint-disable-next-line no-console
                console.log('');
                WebSocketObj.close();
            }, self.timeout);

        }, this.timeout)
    }
}
createWebSocket(webstockUrl);
// const webstock = {
//     install: function (Vue) {
//         Vue.$webstock = WebSocketObj
//     }
// }
const websocket = WebSocketObj
export default websocket
