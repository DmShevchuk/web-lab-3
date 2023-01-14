interface DataBaseBean {
    fun loadHits(): ArrayList<*>?
    fun saveTheShoot(shoot: Result)
}