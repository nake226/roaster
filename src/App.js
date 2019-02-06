import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();

    /**
     * stateで何を管理するか
     * want：部署名
     */
    this.state = {
      location: "三浦海岸"
    };
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
