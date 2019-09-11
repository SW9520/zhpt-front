var webSocketJS = {
    checkBrowser: function() {
        if ("WebSocket" in window) {
            return true;
        } else {
            return false;
        }
    },
    initWebSocket(url) { //初始化weosocket 

        const wsuri = process.env.WS_API + "/websocket/"+url; //ws地址
        let wk = new WebSocket(wsuri);
        wk.onopen = this.websocketonopen;
        this.websocket.onerror = this.websocketonerror;

        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
    },
}

export default {
    webSocketJS
}
