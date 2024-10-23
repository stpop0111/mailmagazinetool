// グローバルスコープで変数を宣言
let currentTemplate = null;
let currentContent = null;
let templates = null;

// 開発確認用のコンソールログ
console.log('JavaScriptが正しく読み込まれました');

// DOM読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM読み込み完了');
    
    // 要素取得の確認
    const templateSelect = document.getElementById('templateSelect');
    const contentList = document.querySelector('.content-list');
    const editorContainer = document.querySelector('.editor-container');
    
    console.log('テンプレート選択:', templateSelect);
    console.log('コンテンツリスト:', contentList);
    console.log('エディタコンテナ:', editorContainer);

    // モーダル関連の要素
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const closeButton = document.querySelector('.close');

    // プレビュー関連の要素
    const previewSection = document.querySelector('.preview-section');
    const previewContent = document.querySelector('.preview-content');

    console.log('モーダル:', modal);
    console.log('プレビューセクション:', previewSection);

    // テンプレートデータの定義
    templates = {
        templateA: {
            name: "春の新作特集",
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
                    id: "spring-products",
                    name: "商品セクション",
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
            name: "夏物セール",
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
    
    templateSelect.addEventListener('change',handleTemplateChange);
});

// テンプレートセレクトボックスの初期化
function initializeTemplateSelect(){
    const templateSelect = getElementById('templateSelect');

    // デフォルトのオプションをクリア
    templateSelect.innerHTML = `
        <option value="">テンプレートを選択してください</option>
    `

    //テンプレートの選択しを追加
    Object.keys(templates).forEach(key => {
        const template = templates[key];
        const option = document.createElement('option');
        option.value = key;
        option.textContent = template.name;
        templateSelect.appendChild(option);
    })

}