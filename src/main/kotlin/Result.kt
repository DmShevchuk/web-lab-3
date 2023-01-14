import jakarta.persistence.*
import java.io.Serializable

@Table(name = "results")
@Entity(name = "results")
class Result : Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private var id: Long? = null
    fun getId() = id

    @Column(name = "cordX")
    private var cordX: Float? = null
    fun setCordX(value: Float) {
        cordX = value
    }

    fun getCordX() = cordX

    @Column(name = "cordY")
    private var cordY: Float? = null
    fun setCordY(value: Float) {
        cordY = value
    }

    fun getCordY() = cordY

    @Column(name = "cordR")
    private var cordR: Int? = null
    fun setCordR(value: Int) {
        cordR = value
    }

    fun getCordR() = cordR

    @Column(name = "time")
    private var time: Long? = null
    fun setTime(time: Long) {
        this.time = time
    }
    fun getTime() = time

    @Column(name = "exec")
    private var execution: Long? = null
    fun setExecution(time: Long) {
        execution = time
    }

    @Column(name = "result")
    private var result: String? = null
    fun setResult(value: String) {
        result = value
    }

    fun getResult() = result

    fun execFormatted() = "$execution ms"
    override fun toString() = "$cordX, $cordY, $cordR"
}