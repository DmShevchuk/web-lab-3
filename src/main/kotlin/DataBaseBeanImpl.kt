import jakarta.annotation.PostConstruct
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Named
import jakarta.persistence.*
import jakarta.transaction.Transactional
import java.io.Serializable

@Named
@Transactional
open class DataBaseBeanImpl: DataBaseBean, Serializable {
    private val persistenceUnit = "db"
    private var entityManagerFactory: EntityManagerFactory? = null
    private var entityManager: EntityManager? = null
    private var transaction: EntityTransaction? = null

    @PostConstruct
    private fun settleConnection() {
        entityManagerFactory = Persistence.createEntityManagerFactory(persistenceUnit)
        entityManager = entityManagerFactory!!.createEntityManager()
        transaction = entityManager!!.transaction
    }

    override fun loadHits(): ArrayList<*>? {
        try {
            transaction!!.begin()
            val query: Query = entityManager!!.createQuery("SELECT e FROM results e ORDER BY time DESC")
            transaction!!.commit()
            return query.resultList as ArrayList<*>
        } catch (exception: RuntimeException) {
            if (transaction!!.isActive) {
                transaction!!.rollback()
            }
            println("Failed to synchronize lists")
        }
        return null
    }

    override fun saveTheShoot(shoot: Result){
        transaction!!.begin()
        entityManager!!.persist(shoot)
        entityManager!!.flush()
        entityManager!!.transaction.commit()
    }
}