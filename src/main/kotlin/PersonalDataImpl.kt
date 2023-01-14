import jakarta.annotation.PostConstruct
import jakarta.inject.Inject
import jakarta.inject.Named
import java.io.Serializable
import javax.faces.bean.ManagedBean;

@Named
@ManagedBean(name = "personalData")
open class PersonalDataImpl : PersonalData, Serializable {
    @Inject
    private lateinit var dataBaseBean: DataBaseBean

    private var records: ArrayList<Result> = ArrayList()
    open fun getRecords() = records.reversed()
    override fun addRecord(shoot: Result) {
        records.add(shoot)
    }
    @PostConstruct
    private fun connectToDb(){

        records.addAll(dataBaseBean.loadHits() as ArrayList<Result>)
    }
    override fun clearRecords() {
        records.clear()
    }
}