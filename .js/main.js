// グローバルスコープで変数を宣言
let currentTemplate = null;
let currentContent = null;
let templates = null;

// DOM要素の参照を保持する変数
let templateSelect = null;
let contentList = null;
let editorContainer = null;
let modal = null;
let modalContent = null;
let closeButton = null;
let previewSection = null;
let previewContent = null;

// 開発確認用のコンソールログ
console.log('JavaScriptが正しく読み込まれました');

// DOM読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM読み込み完了');
    
    // 要素の取得は1回だけ行う
    templateSelect = document.getElementById('templateSelect');
    contentList = document.querySelector('.content-list');
    editorContainer = document.querySelector('.editor-container');
    modal = document.querySelector('.modal');
    modalContent = document.querySelector('.modal-content');
    closeButton = document.querySelector('.close');
    previewSection = document.querySelector('.preview-section');
    previewContent = document.querySelector('.preview-content');
    
    // 要素取得の確認ログ
    console.log('テンプレート選択:', templateSelect);
    console.log('コンテンツリスト:', contentList);
    console.log('エディタコンテナ:', editorContainer);
    console.log('モーダル:', modal);
    console.log('プレビューセクション:', previewSection);

    // テンプレートデータの定義
    templates = {
        templateA: {
            name: "テンプレートA",
            contents: [
                {
                    id: "spring-header",
                    name: "ヘッダーバナー",
                    type: "banner",
                    layout: "1列",
                    data: {
                        imageUrl: "",
                        title: "春の新作コレクション",
                        description: "新生活に向けた最新アイテムが続々入荷中！"
                    }
                },
                {
                    id: "maincontents",
                    name: "メインコンテンツ",
                    type: "products",
                    layout: "2列",
                    data: {
                        products: [
                            {
                                imageUrl: "",
                                name: "春物ワンピース",
                                price: 12800
                            },
                            {
                                imageUrl: "",
                                name: "花柄ブラウス",
                                price: 8800
                            }
                        ]
                    }
                },
                {
                    id: "subcontents",
                    name: "サブコンテンツ",
                    type: "products",
                    layout: "2列",
                    data: {
                        products: [
                            {
                                imageUrl: "",
                                name: "春物ワンピース",
                                price: 12800
                            },
                            {
                                imageUrl: "",
                                name: "花柄ブラウス",
                                price: 8800
                            }
                        ]
                    }
                }
            ]
        },
        templateB: {
            name: "テンプレートB",
            contents: [
                {
                    id: "summer-header",
                    name: "セールバナー",
                    type: "banner",
                    layout: "1列",
                    data: {
                        imageUrl: "",
                        title: "サマーセール開催中",
                        description: "最大70%OFF！"
                    }
                }
            ]
        }
    };

    // データ構造の確認
    console.log('テンプレートデータ:', templates);
    console.log('データ構造詳細:', JSON.stringify(templates, null, 2));

    initializeTemplateSelect();
    // テンプレート選択時の処理
    templateSelect.addEventListener('change',handleTemplateChange);
});

// テンプレートセレクトボックスの初期化
function initializeTemplateSelect() {
    // 1. セレクトボックスの要素を取得
    // 2. セレクトボックスの中身を初期化
    // すべての選択肢を削除し、デフォルトの選択肢のみを設定
    templateSelect.innerHTML = `
        <option value="">テンプレートを選択してください</option>
    `;

    // 3. テンプレートの選択肢を追加
    Object.keys(templates).forEach(key => {
        // 3-1. templatesオブジェクトのキーを取得（templateA, templateB）
        const template = templates[key];  // 各テンプレートのデータを取得

        // 3-2. 新しいoption要素を作成
        const option = document.createElement('option');
        
        // 3-3. optionの値を設定
        option.value = key;  // value属性に設定（templateA, templateB）
        
        // 3-4. optionの表示テキストを設定
        option.textContent = template.name;  // 表示名を設定（"春の新作特集", "夏物セール"）
        
        // 3-5. 作成したoptionをセレクトボックスに追加
        templateSelect.appendChild(option);
    })
}

function handleTemplateChange(event){
    const selectedValue = event.target.value;

    // 選択状態をリセット

    currentTemplate = null;
    currentContent = null;

    if(selectedValue){
        currentTemplate = templates[selectedValue];
        console.log('選択されたテンプレート：',currentTemplate);

        updateUI();
    }
}

function updateUI(){
    if(!currentTemplate) return;
    // 動作確認用のログ
    console.log('UIを更新します');
    console.log('現在のテンプレート:', currentTemplate.name);
    console.log('コンテンツ数:', currentTemplate.contents.length);

    updateContentList();
    
}

// コンテンツリストの更新関数
function updateContentList() {
    if (!contentList) return;

    // リストをクリア
    contentList.innerHTML = '';

    // 各コンテンツ項目を生成
    currentTemplate.contents.forEach(content => {
        const listItem = document.createElement('li');
        listItem.className = 'content-item';
        listItem.setAttribute('data-id', content.id);

        listItem.innerHTML = `
            <div class="content-item_header">
                <span class="content-item_title">${content.name}</span>
                <span class="content-item_type">${content.layout}</span>
            </div>
            <div class="content-item_body">
                <span class="content-item_label">${content.type}</span>
            </div>
        `;

        // クリックイベントの追加
        listItem.addEventListener('click', () => handleContentClick(content));

        contentList.appendChild(listItem);
    });
}

// コンテンツ項目クリック時の処理
function handleContentClick(content) {
    console.log('選択されたコンテンツ:', content);

    // 現在のアクティブ項目のクラスを削除
    const activeItems = document.querySelectorAll('.content-item.active');
    activeItems.forEach(item => item.classList.remove('active'));

    // クリックされた項目をアクティブに
    const clickedItem = document.querySelector(`[data-id="${content.id}"]`);
    if (clickedItem) {
        clickedItem.classList.add('active');
    }

    // 選択中のコンテンツを更新
    currentContent = content;
}