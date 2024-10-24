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

    updateEditor();
}

function updateEditor(){
    if (!currentContent || !editorContainer) return;

    let formHTML = '';

    if(currentContent.type === 'banner'){
        formHTML = generateBannerForm();
    } else if(currentContent.type === 'products'){
        formHTML = generateProductsForm();
    }
    
    editorContainer.innerHTML = `
    <section class="editor-section">
        <h2 class="editor-section_title">${currentContent.name}の編集</h2>
        ${formHTML}
        <div class="button-container">
            <button type="button" id="previewButton" class="preview-button">
                プレビュー表示
            </button>
        </div>
    </section>
    <section class="preview-section">
        <h3 class="preview-section_title">プレビュー</h3>
        <div class="preview-content"></div>
    </section>
`;

    setFormValues();

    setupFormEventListeners();
}

function generateBannerForm() {
    return `
        <div class="input-group">
            <label for="bannerImage">画像URL</label>
            <input type="url" id="bannerImage" class="input-field" required>
        </div>
        <div class="input-group">
            <label for="bannerTitle">タイトル</label>
            <input type="text" id="bannerTitle" class="input-field" required>
        </div>
        <div class="input-group">
            <label for="bannerDescription">説明文</label>
            <textarea id="bannerDescription" class="input-field" required></textarea>
        </div>
    `;
}

// 商品用フォームの生成
function generateProductsForm() {
    let productInputs = '';

    currentContent.data.products.forEach((product, index) => {
        productInputs += `
            <div class="input-group">
                <h3>商品${index + 1}</h3>
                <div class="input-group">
                    <label for="productImage${index}">商品画像URL</label>
                    <input type="url" id="productImage${index}" class="input-field" required>
                </div>
                <div class="input-group">
                    <label for="productName${index}">商品名</label>
                    <input type="text" id="productName${index}" class="input-field" required>
                </div>
                <div class="input-group">
                    <label for="productPrice${index}">価格</label>
                    <input type="number" id="productPrice${index}" class="input-field" required>
                </div>
            </div>
        `;
    });

    return productInputs;
}

// フォームの値を設定
function setFormValues() {
    if (currentContent.type === 'banner') {
        const { imageUrl, title, description } = currentContent.data;
        setInputValue('bannerImage', imageUrl);
        setInputValue('bannerTitle', title);
        setInputValue('bannerDescription', description);
    } else if (currentContent.type === 'products') {
        currentContent.data.products.forEach((product, index) => {
            setInputValue(`productImage${index}`, product.imageUrl);
            setInputValue(`productName${index}`, product.name);
            setInputValue(`productPrice${index}`, product.price);
        });
    }
}

// 入力値の設定ヘルパー関数
function setInputValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value || '';
    }
}

// フォームのイベントリスナー設定
function setupFormEventListeners() {
    const inputs = editorContainer.querySelectorAll('.input-field');
    const previewButton = document.getElementById('previewButton');

    // 入力フィールド
    inputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
        input.addEventListener('blur', handleInputBlur);
    });

    //プレビューボタン
    if(previewButton){
        previewButton.addEventListener('click', handlePreviewClick);
    }
}

// 入力変更時の処理
function handleInputChange(event) {
    console.log('入力変更:', event.target.id, event.target.value);
    updateContentData();
}

//プレビューボタンクリック時の処理追加
function handlePreviewClick(){
    const inputs = editorContainer.querySelector('.input-field');
    let isVaild = true;

    inputs.forEach(input => {
        if(!validateInput(input)){
            isbvaild = false;
        }
    });

    if(!isVaild){
        alert('入力内容を確認してください');
        return;
    }

    updatePreview();

    const previewSection = document.querySelector('.preview-section');
    if(previewSection){
        previewSection.scrollIntoView({behavior:'smooth'});
    }
}

// フォーカスが外れた時の処理
function handleInputBlur(event) {
    console.log('入力確定:', event.target.id, event.target.value);
    validateInput(event.target);
}

// 入力値の検証
function validateInput(input) {
    if (input.required && !input.value) {
        input.classList.add('error');
        return false;
    }
    input.classList.remove('error');
    return true;
}

function updateContentData(){
    if(!currentContent) return;

    if(currentContent.type === 'banner'){
        currentContent.data = {
            imageUrl: document.getElementById('bannerImage').value,
            title: document.getElementById('bannerTitle').value,
            description: document.getElementById('bannerDescription').value,
        };       
    }
    else if(currentContent.type === 'products'){

        const products = [];
        currentContent.data.products.forEach((_, index) => {
            products.push({
                imageUrl: document.getElementById(`productImage${index}`).value,
                name: document.getElementById(`productName${index}`).value,
                price: document.getElementById(`productPrice${index}`).value,
            });
        });

        currentContent.data.products = products;
    }

}

function updatePreview(){
    const previewContent = document.querySelector('.preview-content');
    if(!previewContent || !currentContent) return;

    let previewHTML = '';

    if(currentContent.type === 'banner'){
        previewHTML = generateBannerPreview();
    }  
    else if (currentContent.type === 'products'){
        previewHTML = generateProductsPreview();
    }

    previewContent.innerHTML = previewHTML;
}

// バナープレビューの生成
function generateBannerPreview() {
    const { imageUrl, title, description } = currentContent.data;
    return `
        <div class="preview-banner">
            ${imageUrl ? `<img src="${imageUrl}" alt="${title}" style="max-width: 100%;">` : '<div class="preview-image-placeholder">画像が設定されていません</div>'}
            <h2 style="margin-top: 10px;">${title || 'タイトルが設定されていません'}</h2>
            <p>${description || '説明文が設定されていません'}</p>
        </div>
    `;
}

// 商品プレビューの生成
function generateProductsPreview() {
    const { products } = currentContent.data;
    const isDoubleColumn = currentContent.layout === '2列';

    const productsHTML = products.map(product => `
        <div class="preview-product" style="flex: ${isDoubleColumn ? '0 0 48%' : '0 0 100%'}">
            ${product.imageUrl ?
                `<img src="${product.imageUrl}" alt="${product.name}" style="max-width: 100%;">` :
                '<div class="preview-image-placeholder">画像が設定されていません</div>'
            }
            <h3 style="margin-top: 10px;">${product.name || '商品名が設定されていません'}</h3>
            <p style="color: #e44d26;">¥${product.price ? product.price.toLocaleString() : '価格未設定'}</p>
        </div>
    `).join('');

    return `
        <div class="preview-products" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: ${isDoubleColumn ? 'space-between' : 'center'}">
            ${productsHTML}
        </div>
    `;
}

