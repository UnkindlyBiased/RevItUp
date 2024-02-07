import styles from './styles/ArticleComponents.module.css'

function ArticleRow({ post }) {
    return (
        <div className={styles.bigRowItem}>
            <img src={post.imageLink}/>
            <div className={styles.postPreview}>
                <h1>{post.title}</h1>
                <p>{post.previewText}</p>
            </div>
        </div>
    )
}

export { ArticleRow }