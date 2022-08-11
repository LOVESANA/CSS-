# CSSzimaku
動画編集やサムネ編集で字幕を作成しているときにCSSで装飾したいなって思うタイプの人向けに作りました。<br>
オートセーブ機能を搭載しています。<br>
フォント機能はまだ未実装です。<br>

# 使い方
①プレビュー画面の文字列（デフォルトで”CSS字幕ツール”）をクリックすると、<br>
　キーボードを使用して任意の文字列に編集することができます。<br>
②コード画面のCSSはプレビュー画面の文字列にセレクタが対応しているため、<br>
　プロパティと値のみを編集してください。<br>
③編集が終了したら上記メニューの画像を撮るをクリックすると、画像が生成されます。<br>
④画像を右クリックし"イメージを別名で保存"を選択することで画像として字幕を保存できます。<br>

# 小技と注意
・付箋が複数あり、よく使うテンプレートを一度作ればすぐに切り替えることが可能です。<br>
・縁取りは<code>text-shadow</code>の値を<code>,</code>で区切って複数指定することで実装できます。<br>
・以下のコードを編集すると白背景が透過されて使いやすくなります。<br>
　<code>background:white;</code>を<code>background:transparent;</code>に書き換える。<br>
・セキュリティ対策を何もしていないので、<br>
　<code>}*{display:none!important</code>などを入力すると跡形もなく吹き飛びます。<br>
 ・ローカルで完結しているため、データが流出する心配はございません。<br>
 
 # 今後の予定
 ・フォント機能を実装します。<br>
 ・html2canvas.jsにおいて、<br>
 　<code>text-shadow</code>が先頭の一つの値しか読み込まない仕様を強引に突破した手法を<br>
 　Qiitaにカキコします。<br>
  
 # 連絡先＆就職関連
 ・<a>https://twiter.com/LovesanaCSS</a>
 
