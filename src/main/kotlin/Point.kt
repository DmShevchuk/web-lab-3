import jakarta.enterprise.context.SessionScoped
import jakarta.inject.Inject
import jakarta.inject.Named
import java.io.Serializable
import javax.faces.bean.ManagedBean;

@Named
@SessionScoped
@ManagedBean(name = "point")
open class Point : Serializable {

    @Inject
    private lateinit var personalData: PersonalData

    @Inject
    private lateinit var dataBaseBean: DataBaseBean

    private var x: String? = "0"
    open fun getX() = x
    open fun setX(value: String) {
        x = value
    }


    private var y: String? = null
    open fun getY() = y
    open fun setY(value: String) {
        y = value
    }


    private var r: String? = "1"
    open fun getR() = r
    open fun setR(value: String) {
        r = value
    }

    private var offset: Int? = null
    open fun getOffset() = offset
    open fun setOffset(value: String) {
        offset = value.toInt()
    }

    fun submit() {
        val start = System.nanoTime()
        if (x.isNullOrEmpty() || y.isNullOrEmpty() || r.isNullOrEmpty()) return
        val xValue: Float
        val yValue: Float
        val rValue: Int

        try {
            xValue = x!!.toFloat()
            yValue = y!!.toFloat()
            rValue = r!!.toInt()
        } catch (e: NumberFormatException) {
            return
        }

        if (!isInRange(xValue, yValue, rValue)) return
        val check = isHit(xValue, yValue, rValue)
        pushTheResult(xValue, yValue, rValue, start, check);
    }

    open fun pushTheResult(x: Float, y: Float, r: Int, stamp: Long, result: Boolean) {
        val shoot: Result = Result().apply {
            setCordX(x); setCordY(y); setCordR(r)
            setTime(System.currentTimeMillis())
            setExecution(System.nanoTime() - stamp)
            setResult(result.toString())
        }
        personalData.addRecord(shoot)
        dataBaseBean.saveTheShoot(shoot)
    }


    private fun isInRange(x: Float, y: Float, r: Int): Boolean {
        return r in arrayOf(1, 2, 3, 4, 5)
    }

    open fun clearRecords() {
        personalData.clearRecords()
    }

    private fun isHit(x: Float, y: Float, r: Int): Boolean {
        return (x >= 0 && y >= 0 && ((x * x) + (y * y) <= ((r * r) / 4)))
                || (x >= 0 && y <= 0 && (x <= (r / 2)) && (y > -r))
                || (x <= 0 && y >= 0 && (((-1 * x) + y) <= r))
    }
}