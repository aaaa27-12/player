
var app  = new Vue({
    el:"#player",
    data: {
        query: "",
        musicList:[],
        musicUrl: "",
        musicCover: "",
        hotComments: [],
        isPlaying: false,
        //遮罩层显示状态
        isShow: false,
        mvUrl: ""
    },
    methods: {
        // 搜索歌曲
        searchMusic:function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
            .then(function(response) {
                that.musicList = response.data.result.songs;
            },
            function(err) {}
        );
        },
        // 歌曲播放
        playMusic: function(musicId) {
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
                function(response) {
                    that.musicUrl = response.data.data[0].url;
                },
                function(err) {}
            );
        // 歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
                function(response) {
                    // console.log(response.data.songs[0].al.picUrl);
                    that.musicCover = response.data.songs[0].al.picUrl;
                },
                function(err) {}
            );
        // 歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
                function(response) {                    
                    that.hotComments = response.data.hotComments;
                },
                function(err) {}
            );
        },
        //歌曲播放
        play: function() {
            this.isPlaying = true;
        },
        pause1: function() {
            this.isPlaying = false;
        },
        //播放mv
        playMv: function(mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
                function(response) {
                    // console.log(response);
                    console.log(response.data.data.url);
                    that.isShow = true;
                    that.$refs.audio.pause();
                    that.mvUrl = response.data.data.url;
                },
                function(err) {}
            );
        },
        // 关闭mv
        hide:function() {
            this.isShow = false;
            this.mvUrl = '';
            
        }
        

    }
})