import React, { Component } from "react";
import axios from "axios";

// クリエイティブ室の一時的な配列
var creativeRoaster = [];

class App extends Component {
  constructor(props) {
    super(props);

    /**
     * stateで何を管理するか
     * want：部署名
     */
    this.state = {
      isLogin: false,
      departmentList: [],
      user: null,
      group: null
    };
  }

  // コンポーネントのマウント時
  componentDidMount() {
    this.httpClient = axios.create({
      baseURL: "https://kadou.i.nijibox.net/api",
      withCredentials: true
    });

    // 認証関数の呼び出し
    this.loadAuth()
      .then(() => {
        if (!this.state.isLogin) {
          return Promise.resolve();
        }
        // 初期表示で出てくる部署一覧
        return this.loadCreative();
      })
      .catch(err => {
        alert("APIがエラーを返しました\n\n" + err);
      });
  }

  // 認証関数の定義
  loadAuth() {
    return this.httpClient
      .get("/auth", { params: { callback: "http://localhost:3000" } })
      .then(this.commonResponseHandling)
      .then(result => {
        if (result.is_login) {
          this.setState({ isLogin: true });
        } else if (result.auth_url) {
          window.location.href = result.auth_url;
        }
      });
  }

  // 部署名を返す
  loadDepartments() {
    return this.httpClient
      .get("/who/departments")
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({ departmentList: result });
      });
  }

  // ユーザを返す
  loadUser() {
    return this.httpClient
      .get("/who/user/1")
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({ user: result });
      });
  }

  // クリエイティブ室を返す
  loadCreative() {
    return this.httpClient
      .get("/who/search?department_id=5")
      .then(this.commonResponseHandling)
      .then(result => {
        // ここで20名
        creativeRoaster = result;
        if (result.item_list.length === 20) {
          this.httpClient
            .get("/who/search?department_id=5&page=2")
            .then(this.commonResponseHandling)
            .then(result => {
              // ここで40名
              creativeRoaster.item_list = creativeRoaster.item_list.concat(
                result.item_list
              );
              if (result.item_list.length === 20) {
                this.httpClient
                  .get("/who/search?department_id=5&page=3")
                  .then(this.commonResponseHandling)
                  .then(result => {
                    // ここで60名
                    creativeRoaster.item_list = creativeRoaster.item_list.concat(
                      result.item_list
                    );
                    if (result.item_list.length !== 20) {
                      console.log("３回で取得完了");
                      this.setState({ group: creativeRoaster });
                    } else {
                      console("クリエイティブ室そんなに増えたの？");
                    }
                  });
              } else {
                console.log("２回で取得完了");
                this.setState({ group: creativeRoaster });
              }
            });
        } else {
          console.log("１回で取得完了");
          this.setState({ group: creativeRoaster });
        }
      });
  }

  commonResponseHandling(res) {
    console.debug(res);
    if (res.data.code !== "200") {
      console.error(res.data.data);
      return Promise.reject("API Error:" + res.data.data.message);
    }
    return Promise.resolve(res.data.data);
  }

  /**
   * 関数のまとめ
   */

  /*
   * API通信をする関数
   * componentDidMount()で行う
   */

  /**
   * 社員を表示する関数
   * loadUser()的な感じ
   */

  /**
   * 部署名を変更する関数
   * changeDep()的な感じ
   */

  render() {
    return (
      <div className="App">
        {/* ヘッダー
          must：アプリケーション名
          want：tableViewとcollectionViewの切り替えとか
          component：
            Header：./layout/配下に置く
         */}
        <header className="App-header">
          <p>- Niji Roaster -</p>
        </header>

        {/* ナビ
          want：部署を押下すると表示が変わるナビ
         */}

        {/* コンテンツ
          must：社員が誰かしら表示される
          want：アニメーション
          component：
            MemberList：TodoListみたいな感じ
              ./components/配下に置く
            Member：1つのTodoみたいな感じ
              ./components/配下に置く
         */}
        {this.state.user && (
          <div>
            {this.state.user.user_id}
            {this.state.user.user_name}
            <br />
            {this.state.user.description}
            <img src={this.state.user.main_photo_url} alt="aaa" />
          </div>
        )}
        <ul>
          {this.state.departmentList.map((row, index) => {
            return <li key={index}>{row.department_name}</li>;
          })}
        </ul>

        {this.state.group && (
          <div>
            {this.state.group.item_list.user_id}
            aaaa
            <ul>
              {this.state.group.item_list.map((row, index) => {
                return (
                  <li key={index}>
                    <img src={row.photo_url} alt="aaa" />
                    {row.user_name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* フッター
          must：特にないなあ
          want：上部に戻る？的な？
          component：
            Footer：./layout/配下に置く
         */}
      </div>
    );
  }
}

export default App;
