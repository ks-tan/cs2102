exports.OVERALL_STATS_SUMMARY = 
    "SELECT 'Overall Funds Report' as title, " + 
    "   'USD ' || to_char(SUM(amount), 'FM999,999,999,999.00')    \"Total Amount Pledged\" " +
    "FROM funds";

exports.OVERALL_STATS_CONTENT = 
    "SELECT " +
    "   extract(month from time)    \"month\", " +
    "   extract(year from time)    \"year\", " +
    "   to_char(SUM(amount), 'FM999,999,999,999.00')    \"funds pledged\", " +
    "   to_char(AVG(amount), 'FM999,999,999,999.00')    \"average pledged amount\", " + 
    "   COUNT(*)    \"number of pledge\", " +
    "   COUNT(DISTINCT project)    \"distinct projects\" " +
    "FROM funds " +
    "GROUP BY extract(month from time), extract(year from time) " +
    "ORDER BY year DESC, month DESC";

exports.PROJECT_STATS_SUMMARY = 
    "SELECT " + 
    "   COUNT(*)    \"Total Number of Projects\", " +
    "   COUNT(DISTINCT owner_account)    \"Distinct Project Owners\", " +
    "   COUNT(DISTINCT category)    \"Distinct Categories\", " +
    "   'USD ' || to_char(SUM(amount_sought), 'FM999,999,999,999.00')    \"Total Amount Sought\", " +
    "   'USD ' || to_char(AVG(amount_sought), 'FM999,999,999,999.00')    \"Average Amount Sought\" " + 
    "FROM project";

exports.PROJECT_STATS_CONTENT = 
    "SELECT " +
    "   P.title, " +
    "   to_char(P.start_date, 'DD/MM/YYYY')    \"Start Date\", " + 
    "   to_char(P.end_date, 'DD/MM/YYYY')    \"End Date\", " +
    "   to_char(P.amount_sought, 'FM999,999,999,999.00')    \"Amount Sought\", " +
    "   to_char(SUM(F.amount), 'FM999,999,999,999.00')    \"Amount Pledged\",  " +
    "   to_char(100 * SUM(F.amount) / P.amount_sought, 'FM999.00') || '%'    \"Ratio\" " +
    "FROM project AS P " +
    "LEFT OUTER JOIN funds AS F " + 
    "   ON P.id = F.project " +
    "GROUP BY P.id " + 
    "ORDER BY P.end_date DESC, P.id";
