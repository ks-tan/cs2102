exports.OVERALL_STATS_SUMMARY = 
    "SELECT 'Overall Funds Report' as title, " + 
    "   'USD ' || to_char(SUM(amount), 'FM999,999,999,999.00')    \"Total Amount Pledged\" " +
    "FROM funds";

exports.OVERALL_STATS_CONTENT = 
    "SELECT " +
    "   extract(month from time)    \"month\", " +
    "   extract(year from time)    \"year\", " +
    "   to_char(SUM(amount), 'FM999999999999.00')    \"funds pledged\", " +
    "   to_char(AVG(amount), 'FM999999999999.00')    \"average pledged amount\", " + 
    "   COUNT(*)    \"number of pledge\", " +
    "   COUNT(DISTINCT project)    \"distinct projects\" " +
    "FROM funds " +
    "GROUP BY extract(month from time), extract(year from time) " +
    "ORDER BY year DESC, month DESC";
