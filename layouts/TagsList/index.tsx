import { Paper } from "../../UI/Paper";
import Tag from "../../components/Tag";
import styles from './TagsList.module.css';

const tags = [

]

export default function TagsList() {
    return (
        <div>
            <Paper radius="large" className={styles.container}>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Тэги</th>
                        <th>Пустая колонка</th>
                    </tr>
                </table>
            </Paper>
        </div>
    )
}